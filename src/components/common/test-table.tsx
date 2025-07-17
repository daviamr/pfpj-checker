/* eslint-disable react-refresh/only-export-components */

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, Building2, Check, ChevronsLeft, ChevronsRight, Download, Edit, Loader, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { UploadSheet } from "../upload-sheet"
import { SheetInfo } from "../sheetIconsInfo"
import { TooltipPadrao } from "../tooltip"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    nome: "International Busines",
    documento: '166.588.888-16',
    numero: "+55 (21) 988776-65544",
    pfpj: "PF"
  },
  {
    id: "m5gr84i10",
    nome: "Olivnit Busines",
    documento: '133.444.222-11',
    numero: "+55 (21) 988776-65544",
    pfpj: "PJ"
  },
  {
    id: "m5gr84i11",
    nome: "Skylooob Busines",
    documento: '177.888.666-44',
    numero: "+55 (21) 988776-65544",
    pfpj: "NI"
  }
]

export type Payment = {
  id: string
  nome: string
  documento: string,
  numero: string
  pfpj?: string
}

export function TesteTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [maxRows, setMaxRows] = React.useState(50)
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [hasSelectedRows, setHasSelectedRows] = React.useState(false)
  const [showField, setShowField] = React.useState<string>('Todos')
  console.log(showField)

  const filteredData = React.useMemo(() => {
    if (showField === 'Todos') {
      return data
    }
    const filteredData = data.filter(item => item.pfpj === showField)
    return filteredData
  }, [showField])

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all" />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row" />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 30,
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => {

        const nome = row.getValue("nome");
        const nomeValue = Array.isArray(nome) && nome.length > 0 ? nome[0] : nome;
        const isLongText = nomeValue && typeof nomeValue === 'string' && nomeValue.length > 25;

        return (
          <div className="capitalize">
            {nomeValue ? (
              isLongText ? (
                <TooltipPadrao message="International Business Machines Corporation">
                  <span>{nomeValue}</span>
                </TooltipPadrao>
              ) : (<span>{nomeValue}</span>)) : null}
          </div>
        );
      },
      size: 140,
    },
    {
      accessorKey: "documento",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Documento
            <button className="p-2 rounded-sm duration-300 cursor-pointer hover:bg-secondary">
              <ArrowUpDown size={16} />
            </button>
          </div>
        )
      },
      cell: ({ row }) => (<div className="capitalize">{row.getValue("documento")}</div >),
      size: 100,
    },
    {
      accessorKey: "numero",
      header: "Número",
      cell: ({ row }) => (<div className="capitalize">{row.getValue("numero")}</div>),
    },
    {
      accessorKey: "pfpj",
      header: "PF/PJ",
      cell: ({ row }) => {
        const isSelected = row.getIsSelected()
        return (
          <div>
            {isSelected ? (
              <Select>
                <SelectTrigger className="w-28">
                  {row.getValue("pfpj")}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='PF'>Pessoa Física</SelectItem>
                    <SelectItem value='PJ'>Pessoa Jurídica</SelectItem>
                    <SelectItem value='NI'>Indefinido</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p>{row.getValue("pfpj")}</p>
            )}
          </div>
        )
      },
      size: 180,
    },
    {
      accessorKey: "utils",
      header: "",
      cell: ({ row }) => (<div className="capitalize flex justify-end gap-2">
        { }
        {row.getIsSelected() && (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => row.toggleSelected()}>
            <Check color="green" />
          </Button>
        )}
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => row.toggleSelected()}>
          <Edit />
          {row.getValue("select")}</Button>
        <Button variant={"outline"} size={"icon"}><Trash />{row.getValue("select")}</Button>
      </div>
      ),
      size: 180,
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection, },
  })

  React.useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows
    const ids = selectedRows.map(row => row.original.id)

    setSelectedIds(ids)
    setHasSelectedRows(ids.length > 0)
  }, [rowSelection, table])

  React.useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      table.setPageSize(maxRows);
      setIsLoading(false)
    }, 1000)
  }, [maxRows, table]);

  return (
    <div className=" w-full">
      <div className="relative flex items-center py-4">
        <Search size={16} className="absolute left-2" />
        <div className="flex items-center gap-4 w-full">
          <Input
            placeholder="Filtrar por palavra"
            value={(table.getColumn("pfpj")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("pfpj")?.setFilterValue(event.target.value)}
            className="pl-8 min-w-40" />

          <Select value={showField} onValueChange={setShowField}>
            <SelectTrigger className="font-bold w-40">
              <Building2 size={16} />
              {showField}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filtrar por Pessoa</SelectLabel>
                <SelectItem value='Todos'>Todos</SelectItem>
                <SelectItem value='PF'>Pessoa Física</SelectItem>
                <SelectItem value='PJ'>Pessoa Jurídica</SelectItem>
                <SelectItem value='NI'>Natureza Jurídica NI</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <SheetInfo success={92} error={10} pf={10} pj={22} unkpfpj={13} />
        </div>

        <div className="flex w-full justify-end">
          <div className='flex items-center gap-4'>
            {/* <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`} size={"icon"}><SquarePen size={16} /></Button> */}
            <TooltipPadrao message="Excluir Selecionados">
              <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`} size={"icon"}><Trash size={16} /></Button>
            </TooltipPadrao>
            <TooltipPadrao message="Download Selecionados">
              <Button variant={"outline"} className={`hidden ${hasSelectedRows && 'flex'}`}
                onClick={() => { console.log(selectedIds) }}><Download size={16} /> Seleção</Button>
            </TooltipPadrao>
          </div>
          <UploadSheet />
          <TooltipPadrao message="Download Total">
            <Button variant={"secondary"} className="ml-4"><Download size={16} /> Download</Button>
          </TooltipPadrao>
        </div>
      </div>
      <div className="rounded-md border relative">
        <div className="absolute right-2 top-[6px] z-10">
          <Select value={maxRows.toString()} onValueChange={(value) => setMaxRows(Number(value))}>
            <SelectTrigger className="font-bold">{maxRows}</SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='50'>50</SelectItem>
                <SelectItem value='100'>100</SelectItem>
                <SelectItem value='200'>200</SelectItem>
                <SelectItem value='500'>500</SelectItem>
                <SelectItem value='1000'>1000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-2" style={{ width: `${header.getSize()}px` }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="relative h-32">
                  <Loader size={32} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>

          <span className="text-sm text-gray-600">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
