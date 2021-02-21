import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Ossicle from './Ossicle';

const styles = {
  row: {
    padding: '1px',
  },
  topRow: {
    borderTop: '#022d63 1px solid',
    padding: '0',
  },
  hiddenTopRow: {
    borderTop: 'white 1px solid',
    padding: '0',
  },
  bottomRow: {
    padding: '0',
  },
};

/**
 * ОТобраежение стержня
 * @param {object} props props.
 */
class Rod extends React.Component {
  /**
   * Class constructor.
   * @param {object} props props.
   */
  constructor(props) {
    super(props);

    this.handleCheckBead = this.handleCheckBead.bind(this);
  }

  /**
   * Обрабатывает изменение состояния стержня
   * @param {number} item props.
   */
  handleCheckBead(item) {
    const { onChangeRod, data } = this.props;
    const value = data[item] === 1 ? 0 : 1;

    const newData = data.map((v, i) => {
      // Сделать активными косточки до выбраной
      if (i > 0 && i <= item && v === 0) {
        return value;
      }
      if (item === 0 && i === 0) {
        return value;
      }
      // Вернуть косточки на место до выбраной
      if (item > 0 && i >= item && v === 1) {
        return value;
      }
      return v;
    });

    onChangeRod(newData);
  }

  /**
   * Render
   * @returns {object}.
   */
  render() {
    const ossicles = [];
    const { data, hidden } = this.props;
    let activeClass = 'passive';
    let passiveClass = 'white';
    const middleClass = 'white';

    ossicles.push(
      <Grid item xs={12} lg={12} sm={12} md={12} key={-3} style={styles.row}>
        <Ossicle
          five
          hidden={hidden}
          active={data[0] === 0}
          onClickBead={() => this.handleCheckBead(0)}
          colors={[activeClass, passiveClass]}
        />
      </Grid>,
    );

    activeClass = 'active';
    passiveClass = 'white';
    ossicles.push(
      <Grid
        item
        xs={12}
        lg={12}
        sm={12}
        md={12}
        key={-2}
        style={styles.bottomRow}
      >
        <Ossicle
          five
          hidden={hidden}
          active={data[0] === 1}
          onClickBead={() => this.handleCheckBead(0)}
          colors={[activeClass, passiveClass]}
        />
      </Grid>,
    );

    activeClass = 'white';
    passiveClass = 'active';
    ossicles.push(
      <Grid
        item
        xs={12}
        lg={12}
        sm={12}
        md={12}
        key={-1}
        style={hidden ? styles.hiddenTopRow : styles.topRow}
      >
        <Ossicle
          hidden={hidden}
          five={false}
          active={data[1] === 0}
          onClickBead={() => this.handleCheckBead(1)}
          colors={[activeClass, passiveClass]}
        />
      </Grid>,
    );

    activeClass = 'active';
    passiveClass = 'passive';
    for (let i = 1; i < 5; i += 1) {
      const item = data[i] === 1 ? i + 1 : i;
      const show = data[i] === 0 || data[i + 1] === 1;

      ossicles.push(
        <Grid item xs={12} lg={12} sm={12} md={12} key={i} style={styles.row}>
          <Ossicle
            five={false}
            hidden={hidden}
            active={!show}
            passive={data[i] === 1}
            onClickBead={() => this.handleCheckBead(item)}
            colors={[activeClass, passiveClass, middleClass]}
          />
        </Grid>,
      );
    }

    return (
      <Grid container justify="center">
        {ossicles}
      </Grid>
    );
  }
}

Rod.propTypes = {
  data: PropTypes.array.isRequired,
  hidden: PropTypes.bool.isRequired,
  onChangeRod: PropTypes.func.isRequired,
};

export default Rod;
