import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const _repositories = Array.from(repositories);

    const repoIndex = _repositories.findIndex(repo => repo.id === id);

    if (repoIndex >= 0) {
      const likes = response.data.likes;
      _repositories[repoIndex].likes = likes;
      setRepositories(_repositories);
    }    
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.length ? (
          <FlatList 
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={({item: {id, title, techs, likes}}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{title}</Text>

              <View style={styles.techsContainer}>
                {techs.map((tech, index) => (
                  <Text key={index} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
                
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${id}`}
                >
                  {`${likes} curtidas`}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>Não há repositórios</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize:32,
    color: '#fff'
  }
});
