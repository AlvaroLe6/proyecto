export const validationProcesoSchema = {
  unidad (value) {
      if (value?.length >= 4 ) return true
      return 'El titulo del Libro es obligatorio o muy corto'
    },
    actividad (value) {
      if (value?.length >= 4 ) return true
      return 'El titulo del Libro es obligatorio o muy corto'
    },
    tiempo (value) {
      if (value?.length >= 4 ) return true
      return 'El titulo del Libro es obligatorio o muy corto'
    }, 
} 


  
