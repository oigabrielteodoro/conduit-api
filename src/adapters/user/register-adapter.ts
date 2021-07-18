import {
  register as registerCore,
  Register,
} from '@/core/use-cases/user/register'

export const register: Register = (outsideRegister) => (data) =>
  registerCore(outsideRegister)(data)
