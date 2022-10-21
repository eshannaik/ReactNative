import { useIsFocused } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '../util/database';

function AllPlaces({route}) {
  const [loadedPlaces,setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused(); 

  useEffect(()=>{
    async function loadPlaces(){
      const places = await fetchPlaces();
      setLoadedPlaces(places)
    }

    if(isFocused && route.params){
      loadPlaces()
      // setLoadedPlaces(curlPlaces => [...curlPlaces, route.params.place])
    }
  },[isFocused,route]) // runs whenever there is a change

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;