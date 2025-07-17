import { Eye, EyeClosed } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

const loginUserSchema = z.object({
  email: z.string().email('Endereço de e-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.')
})

type LoginUserData = z.infer<typeof loginUserSchema>

export function LoginForm() {
  const [viewPassword, setViewPassword] = useState("password")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserSchema)
  })

  const onSubmit = (data: LoginUserData) => {
    return reset(data)
  }

  return (
    <form
      className="flex flex-col gap-6 max-w-80"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-6 text-center w-full">
        <img
          src="https://i.imgur.com/hRvaNAi.png"
          alt="Logar no Painel de Gerenciamento de Endereços"
          width={80}
          height={80}
        />
        <h1 className="text-2xl font-bold">Acessar minha conta</h1>
      </div>
      <div className="grid gap-6">

        <div className="grid gap-2">

          <div className="flex items-center gap-2">
            <Label htmlFor="email">E-mail</Label>

            {errors.email && (
              <span>erro {errors.email.message}</span>
            )}
          </div>

          <Input
            id="email"
            type="email"
            placeholder="exemplo@mail.com"
            autoComplete="username"
            {...register('email')} />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="password">Senha</Label>

            {errors.password && (
              <span>erro {errors.password.message}</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Input
              id="password"
              type={viewPassword}
              placeholder="*****"
              autoComplete="current-password"
              {...register('password')}
            />
            <div>

              {viewPassword === "password" ? (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => setViewPassword("text")}
                >
                  <Eye size={16} />
                </Button>
              )
                :
                (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => setViewPassword("password")}
                  >
                    <EyeClosed size={16} />
                  </Button>
                )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          variant="outline">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Ainda não tem uma conta?{" "}
        <a
          href="/register"
          className="underline underline-offset-4 text-azul-claro">
          Cadastrar
        </a>
      </div>
    </form>
  );
}
