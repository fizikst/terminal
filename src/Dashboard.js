import React from 'react';
import RenderControls from './components/renders/RenderControls';
import RenderSettings from './components/renders/RenderSettings';
import useTerminal from './components/states/useTerminal';

function Dashboard(props) {
  // const { state, start, stop } = useTerminal();
  const { renderForsage, renderColumn, renderCard } = props;
  // console.log("Dashboard====", { state });
  // const { numbers, inc } = props;

  return (
    <div>
      {renderForsage()}

      <RenderControls />
      <RenderSettings />
    </div>
  );
}
// renderCard()
// {renderForsage()}
// {renderColumn()}
export default Dashboard;
