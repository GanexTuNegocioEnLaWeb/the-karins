import { products } from "@/consts/products";

// Definición de tipos para los productos
interface Product {
  name: string;
  synonyms: string[];
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) {
    for (let j = 0; j <= b.length; j++) {
      if (i === 0) {
        dp[i][j] = j; // Distancia de insertar j caracteres
      } else if (j === 0) {
        dp[i][j] = i; // Distancia de eliminar i caracteres
      } else if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // Sin costo si son iguales
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,   // Eliminación
          dp[i][j - 1] + 1,   // Inserción
          dp[i - 1][j - 1] + 1 // Sustitución
        );
      }
    }
  }

  return dp[a.length][b.length];
}

const distanciaMaximaNum: number = 3; // Ajustar según sea necesario
// Función para buscar productos y devolver resultados
export function mostrarResultados(busqueda: string): string[] {
  const query = busqueda.toLowerCase();
  const distanciaMaxima: number = distanciaMaximaNum;
  const resultados: string[] = []; // Array para almacenar los resultados

  // Buscar productos que coincidan con la consulta
  products.forEach((producto: Product) => {
    const productoNombre = producto.name.toLowerCase();
    const distanciaProducto = levenshtein(query, productoNombre);

    // Verificar si hay coincidencia exacta, si incluye la búsqueda o si la distancia es menor a la máxima permitida
    if (productoNombre.includes(query) || distanciaProducto <= distanciaMaxima) {
      resultados.push(producto.name); // Agregar nombre del producto al array
    } else {
      // Comprobar sinónimos en la búsqueda
      const coincidencias = producto.synonyms.filter(sinonimo => {
        const distanciaSinonimo = levenshtein(query, sinonimo.toLowerCase());
        return sinonimo.toLowerCase().includes(query) || distanciaSinonimo <= distanciaMaxima;
      });

      if (coincidencias.length > 0) {
        resultados.push(producto.name); // Agregar nombre del producto al array
      }
    }
  });

  // Si no hay resultados, devolver un mensaje
  if (resultados.length === 0) {
    // resultados.push('No se encontraron productos que coincidan con tu búsqueda.');
  }

  return resultados; // Devolver el array de resultados
}
