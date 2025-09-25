import * as ExcelJS from 'exceljs'
import { Response } from 'express'

export async function exportToExcel(data: any[], response: Response, fileName: string) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')

  if (data.length > 0) {
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key.toUpperCase(),
      key,
      width: 20
    }))

    data.forEach((row) => {
      worksheet.addRow(row)
    })
  }

  response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  response.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`)

  await workbook.xlsx.write(response)
  response.end()
}
