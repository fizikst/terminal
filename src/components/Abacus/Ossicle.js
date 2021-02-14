import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  passive: {
    background: "#022d63"
  },
  white: {
    background: "white"
  },
  active: {
    background: "#ffcc14"
  }
});

/**
 * Компонент отрисовки косточки
 * @param {object} props props.
 */
class Ossicle extends React.Component {
  /**
   * Class constructor.
   * @param {object} props props.
   */
  constructor(props) {
    super(props);

    this.handleClickBead = this.handleClickBead.bind(this);
  }

  /**
   * Обрабатывает клика на косточку
   */
  handleClickBead() {
    const { onClickBead } = this.props;
    onClickBead();
  }

  /**
   * Render
   * @returns {object}.
   */
  render() {
    const { classes, five, active, colors, passive, hidden } = this.props;
    const [activeClass, passiveClass, middleClass] = colors;

    const style = {
      borderRadius: "50%",
      textAlign: "center",
      paddingTop: "2px",
      cursor: "pointer",
      color: "white",
      height: "40px",
      opacity: 0.7
    };
    return (
      <div>
        {hidden ? (
          <div>
            <div className={classes.white} style={style} />
          </div>
        ) : five ? (
          <div>
            <div
              className={active ? classes[activeClass] : classes[passiveClass]}
              style={style}
              onClick={this.handleClickBead}
            />
          </div>
        ) : (
          <div>
            <div
              className={
                active
                  ? classes[middleClass]
                  : passive
                  ? classes[activeClass]
                  : classes[passiveClass]
              }
              style={style}
              onClick={this.handleClickBead}
            />
          </div>
        )}
      </div>
    );
  }
}

Ossicle.defaultProps = {
  passive: false,
  hidden: false
};

Ossicle.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickBead: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  hidden: PropTypes.bool,
  passive: PropTypes.bool,
  five: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired
};

export default withStyles(styles)(Ossicle);
