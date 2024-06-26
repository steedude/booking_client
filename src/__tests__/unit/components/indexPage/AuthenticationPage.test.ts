import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import ElementPlus from 'element-plus';
import { useUserStore } from '@/stores';
import AuthenticationPage from '@/pages/AuthenticationPage.vue';

const user = userEvent.setup();

function setup(): void {
  render(AuthenticationPage, {
    global: {
      plugins: [ElementPlus, createTestingPinia()],
    },
  });
}
describe('AuthenticationPage', () => {
  beforeEach(() => {
    setup();
  });

  it('Login', async () => {
    const LOGIN_ACCOUNT = {
      account: 'josh@skylinetw.com',
      password: 'password',
      checkPass: '',
    };

    const accountInput = screen.getAllByLabelText('account')[0] as HTMLInputElement;
    await user.click(accountInput);
    await user.keyboard(LOGIN_ACCOUNT.account);
    expect(accountInput.value).toBe(LOGIN_ACCOUNT.account);

    const passwordInput = screen.getAllByLabelText('Password')[0] as HTMLInputElement;
    await user.click(passwordInput);
    await user.keyboard(LOGIN_ACCOUNT.password);
    expect(passwordInput.value).toBe(LOGIN_ACCOUNT.password);

    const loginButton = screen.getByRole('button', { name: /登入/i });
    await user.click(loginButton);

    const { loginUser } = useUserStore();
    expect(loginUser).toHaveBeenCalledTimes(1);
    expect(loginUser).toHaveBeenCalledWith(LOGIN_ACCOUNT);
  });

  it('Register', async () => {
    const REGISTER_ACCOUNT = {
      account: 'josh@skylinetw.com',
      password: 'password',
      checkPass: 'password',
    };

    const registerTab = screen.getByRole('tab', { name: /Register/i });
    await user.click(registerTab);
    expect(registerTab).toHaveClass('is-active');
    expect(screen.getByText('註冊帳號')).toBeInTheDocument();

    const accountInput = screen.getAllByLabelText('account')[1] as HTMLInputElement;
    await user.click(accountInput);
    await user.keyboard(REGISTER_ACCOUNT.account);
    expect(accountInput.value).toBe(REGISTER_ACCOUNT.account);

    const passwordInput = screen.getAllByLabelText('Password')[1] as HTMLInputElement;
    await user.click(passwordInput);
    await user.keyboard(REGISTER_ACCOUNT.password);
    expect(passwordInput.value).toBe(REGISTER_ACCOUNT.password);

    const confirmInput = screen.getByLabelText('Confirm') as HTMLInputElement;
    await user.click(confirmInput);
    await user.keyboard(REGISTER_ACCOUNT.checkPass);
    expect(confirmInput.value).toBe(REGISTER_ACCOUNT.checkPass);

    expect(passwordInput.value).toBe(confirmInput.value);

    const registerButton = screen.getByRole('button', { name: /註冊/i });
    await user.click(registerButton);

    const { registerUser } = useUserStore();
    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(registerUser).toHaveBeenCalledWith(REGISTER_ACCOUNT);
  });
});
