import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { convert64 } from "./file.helper";

const exportExcelAtoA = async (
  header: any[],
  data: any[],
  filename: string
) => {
  //Definir un arreglo para guardar los encabezados de las columnas que contendra ele xcel
  let data_excel: any[] = [header];
  //agregar los datos al arreglo creado anteriormente y desestructurar los datos
  data_excel.push(...data);
  // Convertir los datos a una hoja de cálculo
  const worksheet = XLSX.utils.aoa_to_sheet(data_excel);
  // Crear un libro de trabajo y agregar la hoja
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);
  let name = generateName();
  const folderPath = path.join(__dirname, `../files`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  // Escribir la ruta del archivo
  const filePath = path.join(__dirname, `../files/${filename}_${name}.xlsx`);
  XLSX.writeFile(workbook, filePath);
  try {
    await fs.promises.access(filePath);
    const report = convert64(filePath);
    return {
      message: `Reporte creado exitosamente`,
      status: 200,
      data: {
        report,
      },
    };
  } catch (error) {
    console.log(error)
    return {
      message: `Error al crear el reporte`,
      status: 500,
    };
  }
};
const generateName = () => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nombre = "";
  for (let i = 0; i < 10; i++) {
    nombre += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  // Agregar un timestamp para asegurar que el nombre sea único
  const timestamp = Date.now();
  return `${nombre}_${timestamp}`;
};

export { exportExcelAtoA };
