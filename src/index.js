import React, {useEffect, useState} from 'react';
import { 
  Text, 
  StatusBar, 
  StyleSheet, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import api from './services/api';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#007462"
  }
})

export default function App () {

  const [projects, setProjects] = useState([])
  const handlePress = async () => {
    const response = await api.post('projects', {
      title: `Project date ${Date.now()}`,
      owner: `Project name ${Date.now()}`
    })

    setProjects([...projects, response.data])
  }

  useEffect(()=> {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  return (
    <>
      <StatusBar backgroundColor="#008000" barStyle="light-content"/>
      <FlatList style={styles.app}
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project}) => (
          <Text key={project.id}> { project.title } </Text>
        )} />
        <TouchableOpacity
          onPress={ () => handlePress() } >
          <Text>
            New Project
          </Text>
        </TouchableOpacity>
    </>
  )
}