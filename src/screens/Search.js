import React, { Component } from 'react';
import {
  Dimensions,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { INIT_LIMIT } from '../config';
import PokemonService from '../services/Pokemon';
import Busy from '../components/Busy';
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      limit: INIT_LIMIT,
      busy: true,
      loading: true,
      loadingMore: false,
      filtering: false,
      refreshing: false,
      error: null,
    };
    this.loadPokemon = this.loadPokemon.bind(this);
  }

  componentDidMount() {
    this.loadPokemon();
  }

  async loadPokemon() {
    const { limit } = this.state;
    const offset = (limit === INIT_LIMIT) ? 0 : limit - INIT_LIMIT;
    const loadResponse = await PokemonService.loadPokemon(offset);
    this.setState((prevState, nextProps) => ({
      data:
        limit === INIT_LIMIT
          ? Array.from(loadResponse.data.results)
          : [...this.state.data, ...loadResponse.data.results],
      busy: false,
    }));
  }

  render() {
    const { busy } = this.state;
    return (<View >
      <Text>Show List</Text>
      <Busy busy={busy} />
    </View >);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});