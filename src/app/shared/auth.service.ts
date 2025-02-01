import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { User, UserInterface, Roles } from '../user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public currentUserSignal = signal<UserInterface | null>(null);
  private redirectUrl: string | null = null;

  constructor(
    private afs: AngularFirestore,
    private fireauth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.fireauth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = this.afs.doc<User>(`users/${firebaseUser.uid}`).ref;
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists) {
          const userData = userSnapshot.data() as User;
          const user: UserInterface = {
            uid: firebaseUser.uid,
            username: userData.username || 'Unknown',
            email: firebaseUser.email || '',
            roles: userData.roles || {}
          };
          this.currentUserSignal.set(user);  
          sessionStorage.setItem('currentUser', JSON.stringify(user)); 
        }
      } else {
        this.currentUserSignal.set(null);
        sessionStorage.removeItem('currentUser');
      }
    });

    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser));
    }
  }

  setRedirect(url: string): void {
    this.redirectUrl = url;
  }

  getRedirect(): string | null {
    return this.redirectUrl;
  }

  isAuthenticated(): boolean {
    return this.currentUserSignal() !== null;
  }

  getCurrentUser(): UserInterface | null {
    return this.currentUserSignal();
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await this.fireauth.signInWithEmailAndPassword(email, password);
      if (response.user) {
        const userRef = this.afs.doc<User>(`users/${response.user.uid}`).ref;
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists) {
          const userData = userSnapshot.data() as User;
          const user: UserInterface = {
            uid: response.user.uid,
            username: userData.username || 'Unknown',
            email: response.user.email || email,
            roles: userData.roles || {},
          };
  
          this.currentUserSignal.set(user);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.toastr.success(`Welcome back, ${user.username}!`);
          const redirectUrl = this.getRedirect() || '/';
          this.router.navigate([redirectUrl]);
        } else {
          console.error('No user data found in Firestore.');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.toastr.error('Login failed. Please check your credentials and try again.');
      this.router.navigate(['/login']);
    }
  }

  async signup(email: string, username: string, userCategory: string, contactno: string, password: string): Promise<void> {
    try {
      const userCredential = await this.fireauth.createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        await this.updateUserData({
          uid: userCredential.user.uid,
          email: email,
          username: username,
          userCategory: userCategory,
          contact: contactno,
          roles: { subscriber: true },
        });
        this.showSuccessMessage(username, contactno);
      }
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async updateUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      username: user.username,
      contact: user.contact,
      userCategory: user.userCategory,
      email: user.email,
      roles: user.roles || { subscriber: true },

    };
    await userRef.set(data, { merge: true });
  }

  async assignRole(uid: string, role: string): Promise<void> {
    const userRef = this.afs.collection('users').doc(uid);
    const userSnapshot = await userRef.get().toPromise();

    if (userSnapshot?.exists) {
      const user = userSnapshot.data() as User;
      if (!user.roles) {
        user.roles = {};
      }
      user.roles[role as keyof Roles] = true;
      await userRef.update(user);
    } else {
      console.error(`User document with UID: ${uid} does not exist.`);
    }
  }

  logout(): void {
    this.fireauth.signOut().then(() => {
      this.currentUserSignal.set(null); 
      sessionStorage.removeItem('currentUser'); 
      this.router.navigate(['/login']);
      this.toastr.info('You logged out from the website');
    }).catch(err => {
      console.error('Logout Error:', err);
      this.toastr.error('Error during logout. Please try again.');
    });
  }

  private showSuccessMessage(username: string, contactno: string): void {
    this.toastr.success(`Registration of ${username} with contact number ${contactno} completed successfully! You logged in as this user`);
    this.router.navigate(['/login']);
  }

  private handleError(error: any): void {
    this.toastr.error(`Error: ${error.message}`);
    console.error('Signup Error:', error);
  }
}
