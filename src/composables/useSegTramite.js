
import {ref } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import { db } from '@/config/firebase';

export default  function useSegTramite(){

    const participanteCollection = useCollection(collection(db, 'participante'));
    const loading = ref(false);
    const error = ref(null);
    const participantes = ref([]);


    const buscarParticipantePorCI = async (ci) => {
      loading.value = true;
      error.value = null;
      try {
        // Asegúrate de que ci es una cadena y no está vacío
        const ciValue = typeof ci === 'string' && ci.trim() !== '' ? ci.trim() : null;
        if (!ciValue) {
          throw new Error("El número de CI proporcionado no es válido.");
        }
        
        const q = query(collection(db, 'participante'), where('ci', '==', ciValue));
        const querySnapshot = await getDocs(q);
        
        // Transforma los resultados en un array de datos de participantes
        participantes.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (participantes.value.length === 0) {
          console.log("No se encontraron participantes con ese CI.");
        } else {
          console.log("Participante encontrado:", participantes.value[0]);
        }
      } catch (e) {
        error.value = e;
        console.error('Error al buscar participante:', e);
      } finally {
        loading.value = false;
      }
    }
  


    return{  
 participanteCollection,
    buscarParticipantePorCI,
    loading,
    error
    }
    
}