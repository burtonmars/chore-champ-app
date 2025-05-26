import authReducer, {
  AuthState,
  setLoading,
  setError,
  setUser,
  logout,
  User,
} from './authSlice';
import { signUpUser } from './authThunks';

describe('auth slice', () => {
  const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
  };

  const mockUser: User = {
    uid: 'testUid123',
    email: 'test@example.com',
    displayName: 'Test User',
  };

  it('should return the initial state when given an undefined state', () => {
    const result = authReducer(undefined, { type: 'unknown_action' });
    expect(result).toEqual(initialState);
  });

  describe('synchronous actions', () => {
    it('should handle setLoading action', () => {
      let nextState = authReducer(initialState, setLoading(true));
      expect(nextState.isLoading).toBe(true);
      expect(nextState.user).toBeNull();
      expect(nextState.error).toBeNull();

      nextState = authReducer(nextState, setLoading(false));
      expect(nextState.isLoading).toBe(false);
    });

    it('should handle setError action with an error message', () => {
      const errorMessage = 'Invalid credentials';
      const previousState: AuthState = { ...initialState, isLoading: true };
      const nextState = authReducer(previousState, setError(errorMessage));

      expect(nextState.error).toBe(errorMessage);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.user).toBeNull();
    });

    it('should handle setError action to clear an error', () => {
      const previousState: AuthState = { ...initialState, error: 'Some previous error' };
      const nextState = authReducer(previousState, setError(null));

      expect(nextState.error).toBeNull();
      expect(nextState.isLoading).toBe(false);
    });

    it('should handle setUser action', () => {
      const nextState = authReducer(initialState, setUser(mockUser));

      expect(nextState.user).toEqual(mockUser);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBeNull();
    });

    it('should handle logout action', () => {
      const previousState: AuthState = { ...initialState, user: mockUser };
      const nextState = authReducer(previousState, logout());

      expect(nextState.user).toBeNull();
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBeNull();
    });
  });

  describe('signUpUser async thunk lifecycle', () => {
    const signUpCredentials = { email: 'newuser@example.com', password: 'password123' };

    it('should set isLoading to true and clear error on signUpUser.pending', () => {
      const action = signUpUser.pending('requestId123', signUpCredentials);
      const nextState = authReducer(initialState, action);

      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    it('should set user, set isLoading to false, and clear error on signUpUser.fulfilled', () => {
      const previousState: AuthState = { ...initialState, isLoading: true };
      const action = signUpUser.fulfilled(mockUser, 'requestId123', signUpCredentials);
      const nextState = authReducer(previousState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.user).toEqual(mockUser);
      expect(nextState.error).toBeNull();
    });

    it('should set error, set isLoading to false, and clear user on signUpUser.rejected', () => {
      const errorMessage = 'Sign up failed horribly';
      const previousState: AuthState = { ...initialState, isLoading: true };
      const action = signUpUser.rejected(null, 'requestId123', signUpCredentials, errorMessage);
      const nextState = authReducer(previousState, action);

      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      expect(nextState.user).toBeNull();
    });
  });
});
