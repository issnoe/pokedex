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
    this.props.navigation.replace('Pokedex', { ...params });
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
    const { busy, data } = this.state;
    return (<View style={styles.container}>
      <View style={styles.boxMainPokemon}>
        <Pokemon id={this.props.route.params.id} callback={() => { }} size={'large'} />
      </View>
      <Busy busy={busy} />
      {busy === false && <ScrollView style={styles.boxInformation}>
        {data && data.base && <View style={styles.boxDirectionRow}>
          <Text style={styles.title}>Experiencia </Text>
          <Text style={styles.levelExperience}>{data && data.base ? data.base.base_experience : ''} </Text>
        </View>}
        <View style={styles.boxDirectionRow}>
          {this._renderChainEvolution()}
        </View>
        {data && data.base && <ScrollView style={styles.boxDirectionColumn}>
          <Text style={styles.title}>Consola de datos </Text>
          <Text style={styles.boxConsole}>{JSON.stringify({ ...data.evolution, ...data.base }, null, 2)}</Text>
        </ScrollView>}
      </ScrollView>}


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
  levelExperience: {
    color: '#273339',
    fontSize: 25,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
  },
  boxMainPokemon: {
    flex: 0.5,
    padding: 30,
    paddingTop: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
  boxInformation: {
    flex: 0.5,
  },
  boxDirectionRow: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20
  },
  boxDirectionColumn: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 20
  },
  boxConsole: {
    backgroundColor: 'white'
  },

});
