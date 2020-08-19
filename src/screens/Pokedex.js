import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import PokemonService from '../services/Pokemon';
import TransformHelper from '../libs/transform';
import Busy from '../components/Busy';
import PokemonCard, { Pokemon } from '../components/PokemonCard';

export default class Pokedex extends Component {
  state = {
    data: [],
    busy: true,
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
      busy: false,
    }));
  }

  goPokedex = (params) => {

    this.props.navigation.navigate('Pokedex', { ...params });
  }

  _renderChainEvolution = () => {
    if (this.state.data && !this.state.data.evolution) {
      return <></>
    }
    const renderAddresses = (this.state.data && this.state.data.evolution.map((row) =>
      <PokemonCard
        key={TransformHelper.uuid(row.name)}
        {...row}
        callback={this.goPokedex} />
    ));
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Evoluciones</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {renderAddresses}
        </View>
      </View>
    );
  };

  render() {
    const { busy } = this.state;

    return (<View style={styles.container}>
      <View style={styles.boxMainPokemon}>
        <Pokemon id={this.props.route.params.id} callback={() => { }} size={'large'} />
      </View>
      <ScrollView style={styles.boxInformation}>
        <View style={styles.boxEvolution}>
          {this._renderChainEvolution()}
        </View>
        <View style={styles.boxAbilities}>
          <Text>hi</Text>
        </View>
      </ScrollView>

      <Busy busy={busy} />
    </View >);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00cff5',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  boxMainPokemon: {
    flex: 0.4,
    padding: 30,
    paddingTop: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
  boxInformation: {
    flex: 0.6,
    flexDirection: 'row',

  },
  boxEvolution: {
    flex: 1,
  },
  boxAbilities: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

});
