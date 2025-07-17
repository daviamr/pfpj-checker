import { Building2, CircleCheck, CircleX, PersonStanding } from "lucide-react"
import { TooltipPadrao } from "./tooltip"

type SheetInfoProps = {
  success: number,
  error: number,
  pf: number,
  pj: number,
  unkpfpj: number,
}

export function SheetInfo({ ...prop }: SheetInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <TooltipPadrao message={`Linhas processadas`}>
        <span className="flex items-center gap-2 font-semibold">
          <CircleCheck size={16} color="green" />{prop.success}
        </span>
      </TooltipPadrao>
      <TooltipPadrao message={`Linhas com erro`}>
        <span className="flex items-center gap-2 font-semibold">
          <CircleX size={16} color="red" />{prop.error}
        </span>
      </TooltipPadrao>
      <span className="border-r-2 select-none h-6"></span>
      <div className="flex items-center gap-4 rounded-lg">
        <TooltipPadrao message={`PF - Pessoa Física`}>
          <span className="flex items-center gap-2 font-semibold">
            <PersonStanding size={16} />{prop.pf}
          </span>
        </TooltipPadrao>
        <TooltipPadrao message={`PJ - Pessoa Jurídica`}>
          <span className="flex items-center gap-2 font-semibold">
            <Building2 size={16} />{prop.pj}
          </span>
        </TooltipPadrao>
        <TooltipPadrao message={`NI - Natureza jurídica não identificada`}>
          <span className="flex items-center gap-2 font-semibold">
            <span>?</span> {prop.unkpfpj}
          </span>
        </TooltipPadrao>
      </div>
    </div>
  )
}