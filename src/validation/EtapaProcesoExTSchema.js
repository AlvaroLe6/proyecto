export const validationProcesoSchema = {
  unidad(value) {
    if (value?.length >= 4) return true
    return 'La unidad es obligatorio o es muy corto'
  },
  actividad(value) {
    if (value?.length >= 4) return true
    return 'La actividad es obligatorio o es muy corto'
  },
  tiempo(value) {
    if (value?.length >= 1) return true
    return 'El tiempo es obligatorio o es muy corto'
  }
}



