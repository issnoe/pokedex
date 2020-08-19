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
import { INIT_LIMIT, COLUMS_SEARCH } from '../config';
import PokemonService from '../services/Pokemon';
import TransformHelper from '../libs/transform';
import Busy from '../components/Busy';
import PokemonCard from '../components/PokemonCard';

const { width, height } = Dimensions.get('window');
export default class Search extends Component {
  state = {
    data: [],
    limit: INIT_LIMIT,
    busy: true,
    loading: true,
    loadingMore: false,
    filtering: false,
    refreshing: false,
    error: null,
  };

  componentDidMount() {
    this.loadPokemon();
  }

  loadPokemon = async () => {
    const { limit } = this.state;
    const offset = (limit === INIT_LIMIT) ? 0 : limit - INIT_LIMIT;
    const loadResponse = await PokemonService.loadPokemon(offset);
    this.setState((prevState, nextProps) => ({
      data:
        limit === INIT_LIMIT
          ? Array.from(loadResponse.data.results)
          : [...this.state.data, ...loadResponse.data.results],
      busy: false,
      loading: false,
      loadingMore: false,
      refreshing: false,
    }));
  }

  refresh = () => {
    this.setState(
      {
        limit: INIT_LIMIT,
        refreshing: true,
      },
      () => {
        this.loadPokemon();
      }
    );
  };

  loadBerofe = () => {
    this.setState(
      (prevState, nextProps) => ({
        limit: prevState.limit + INIT_LIMIT,
        loadingMore: true
      }),
      () => {
        this.loadPokemon();
      }
    );
  };

  goPokedex = (params) => {
    this.props.navigation.navigate('Pokedex', { ...params });
  }

  _renderFooter = () => {
    return (
      <View>
        < Text > Render footer</Text>
      </View >
    );
  };
  render() {
    const { busy } = this.state;
    const { container, flatListContainer, contentContainerStyle } = styles;

    return (<View style={container}>
      <FlatList
        keyExtractor={item => TransformHelper.uuid(item.name)}
        style={flatListContainer}
        contentContainerStyle={contentContainerStyle}
        numColumns={COLUMS_SEARCH}
        initialNumToRender={INIT_LIMIT + INIT_LIMIT}
        ListFooterComponent={this._renderFooter}
        data={this.state.data}
        renderItem={({ item }) => <PokemonCard {...item} id={TransformHelper.getId(item.url)} callback={this.goPokedex} />}
        onRefresh={this.refresh}
        refreshing={this.state.refreshing}
        onEndReached={this.loadBerofe}
        onEndReachedThreshold={0.5}
      />
      <Busy busy={busy} />

    </View >);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: '#3fecbb',
  },
  contentContainerStyle: {
    paddingTop: 40,
  },
});
