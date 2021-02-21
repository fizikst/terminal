import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Rod from './Abacus/Rod';

/**
 * Отобраежение отображения абака
 * @param {object} props props.
 */
class Abacus extends React.Component {
  /**
   * Class constructor.
   * @param {object} props props.
   */
  constructor(props) {
    super(props);

    this.handleChangeRod = this.handleChangeRod.bind(this);
  }

  /**
   * Обрабатывает изменение состояния стержня
   * @param {array} rodData props.
   * @param {string} rodLable props.
   */
  handleChangeRod(rodData, rodLable) {
    const { handleChange, abacus } = this.props;
    const nextAbacusState = { ...abacus, [rodLable]: rodData };
    handleChange(rodData, rodLable, nextAbacusState);
  }

  /**
   * Render
   * @returns {object}.
   */
  render() {
    const columns = [];
    const { abacus, hidden } = this.props;
    const entries = Object.entries(abacus);

    for (let i = 0; i < entries.length; i += 1) {
      const [index, data] = entries[i];
      columns.push(
        <Grid item xs={2} lg={2} sm={2} md={2} key={index}>
          <Rod
            data={data}
            hidden={hidden}
            onChangeRod={(rodData) => this.handleChangeRod(rodData, index)}
          />
        </Grid>,
      );
    }

    return (
      <div>
        <Grid container justify="center">
          {columns}
        </Grid>
      </div>
    );
  }
}

Abacus.propTypes = {
  abacus: PropTypes.object,
  hidden: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

Abacus.defaultProps = {
  abacus: {},
  hidden: false,
};

export default Abacus;
