
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { Warning } from "phosphor-react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { useLinks } from "../store/links"
import { useState } from "react"

const formSchema = zod.object({
  originalUrl: zod.url({ message: 'Endereço não é valido' }),
  shortCode: zod.string().min(1, { message: 'Campo obrigatório!' }).regex(/^[0-9a-zA-Z_-]+$/, {
    message: 'É permitido somente letras, números, traço e underline!'
  })
})

export function LinkForm() {
  
  const { handleSubmit, control, formState: { isValid }, reset } = useForm({ resolver: zodResolver(formSchema), mode: 'onChange', defaultValues: { originalUrl: '', shortCode: '' } })

  const { createLink, linkError } = useLinks();
  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    setSubmitLoading(true);
    try {
      await createLink(data.originalUrl, data.shortCode);

      reset()
    } catch (err) {
      toast.error(linkError);
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <h2 className="text-lg font-semibold mb-6 text-gray-600">Novo link</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='originalUrl'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="mb-6">
              <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2">Link original</label>
              <input type="text" placeholder="www.exemplo.com.br"
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...field}
              />
              {error && <div className="text-sm text-gray-500 flex"><span className="p-1"><Warning className="text-feedback-danger" /></span><span>{error.message}</span></div>}
            </div>
          )}
        />
        <Controller
          name='shortCode'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="mb-6">
              <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2">
                Link encurtado
              </label>

              <div className="flex items-center rounded-lg border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-200">
                <span className="text-gray-500 text-sm">brev.ly/</span>
                <input
                  type="text"
                  className="flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none"
                  {...field}
                />
              </div>

              {error && (
                <div className="text-sm text-gray-500 flex mt-1">
                  <span className="p-1">
                    <Warning className="text-feedback-danger" />
                  </span>
                  <span>{error.message}</span>
                </div>
              )}
            </div>

          )}
        />
        <Button
          size="icon-sm"
          className="w-full font-medium py-3 text-md"
          variant="primary"
          disabled={!isValid || isSubmitLoading}
        >
          {isSubmitLoading ? 'Salvando..' : 'Salvar link'}
        </Button>
      </form>
    </div>
  )
}