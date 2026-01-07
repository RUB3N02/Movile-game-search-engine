import { useState } from "react";
import { FlatList, Text, TextInput, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker"; // Desplegable nativo
import { AppCard } from "../src/components/features/game/AppCard";
import { useSearchApps } from "../src/hooks/useSearchApps";
import { SteamAppFromStore } from "../src/types/steam";

export default function App() {
  const [term, setTerm] = useState("dota");
  const [typeFilter, setTypeFilter] = useState("all");
  const { apps, loading, loadMore } = useSearchApps(term);

  // Filtrar apps por tipo
  const filteredApps =
    typeFilter === "all"
      ? apps
      : apps.filter((a) => a.type.toLowerCase() === typeFilter.toLowerCase());

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1f1f1f" }}>
        <View style={{ flex: 1, padding: 16, backgroundColor: "#1f1f1f" }}>
          <TextInput
            placeholder="Buscar app..."
            placeholderTextColor="#a1a1aa"
            value={term}
            onChangeText={setTerm}
            style={{
              backgroundColor: "#2a2a2a",
              color: "#fff",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 12,
            }}
          />

          {/* Picker nativo para filtrar por tipo */}
          <View
            style={{
              backgroundColor: "#2a2a2a",
              borderRadius: 12,
              marginBottom: 12,
              paddingHorizontal: 8,
            }}
          >
            <Picker
              selectedValue={typeFilter}
              onValueChange={(itemValue) => setTypeFilter(itemValue)}
              style={{ color: "#fff" }}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Todos" value="all" />
              <Picker.Item label="Game" value="game" />
              <Picker.Item label="DLC" value="dlc" />
              <Picker.Item label="Software" value="software" />
              <Picker.Item label="Demo" value="demo" />
              <Picker.Item label="Music" value="music" />
              <Picker.Item label="Tool" value="tool" />
            </Picker>
          </View>

          {loading && apps.length === 0 ? (
            <ActivityIndicator size="large" color="#0f0" style={{ marginTop: 24 }} />
          ) : filteredApps.length === 0 ? (
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 24 }}>
              No se encontraron apps.
            </Text>
          ) : (
            <FlatList
              data={filteredApps}
              keyExtractor={(item: SteamAppFromStore) => item.id.toString()}
              renderItem={({ item }) => <AppCard app={item} />}
              onEndReached={loadMore} // Scroll infinito
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading ? <ActivityIndicator size="small" color="#0f0" style={{ margin: 12 }} /> : null
              }
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
