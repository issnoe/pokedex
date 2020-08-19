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
import PokemonCard, { Pokemon } from '../components/PokemonCard';

const { width, height } = Dimensions.get('window');
export default class Pokedex extends Component {
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
    const { route } = this.props;
    const id = route.params.id;
    const pokemon = await PokemonService.getPokemon(id);
    this.setState((prevState, nextProps) => ({
      data: { ...pokemon },
      loading: false,
      loadingMore: false,
      refreshing: false
    }));
  }

  goPokedex = (params) => {
    this.props.navigation.navigate('Pokedex', { ...params });
  }

  _renderChainEvolution = () => {
    if (this.state.data && !this.state.data.evolution) {
      return (<View>
        <ActivityIndicator animating size="large" />
      </View>)
    }
    const renderAddresses = (this.state.data && this.state.data.evolution.map((row) =>

      <PokemonCard key={TransformHelper.uuid(row.name)} {...row} callback={this.goPokedex} />

    ));
    return (
      <View style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        {renderAddresses}
      </View>
    );
  };

  render() {
    const { busy } = this.state;
    const { container } = styles;

    return (<View style={container}>
      <View style={{
        flex: 0.3,
        padding: 30,
        paddingTop: 40,
        alignContent: 'center',
        justifyContent: 'center'
      }}>
        <Pokemon id={this.props.route.params.id} callback={() => { }} size={'large'} />
      </View>
      {this._renderChainEvolution()}
      <Busy busy={busy} />

    </View >);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00cff5',
  },

});
