import React, {useState, useContext} from 'react'
import {FileText, Map, BarChart2} from 'react-feather'

import masksCommunes from '../../../public/data/masks.json'

import theme from '../../../styles/theme'
import colors from '../../../styles/colors'

import {AppContext, ThemeContext} from '../../../pages'

import Scrollable from '../../scrollable'
import MasksInformations from '../big-picture/big-picture-informations'

import MasksMap from './masks-map'
import MasksStatistics from './masks-statistics'
import MasksMobileMap from './masks-mobile-map'

export const MasksContext = React.createContext()

const MobileMasks = () => {
  const [selectedView, setSelectedView] = useState('stats')

  const app = useContext(AppContext)
  const theme = useContext(ThemeContext)

  const views = {
    stats: (
      <Scrollable>
        <MasksStatistics />
      </Scrollable>
    ),
    map: <MasksMobileMap />,
    informations: (
      <Scrollable>
        <MasksInformations />
      </Scrollable>
    )
  }

  const handleClick = view => {
    app.setSelectedLocation(null)
    setSelectedView(view)
  }

  return (
    <>
      {views[selectedView]}

      <div className='view-selector'>
        <div className={`${selectedView === 'stats' ? 'selected' : ''}`} onClick={() => handleClick('stats')}>
          <BarChart2 size={32} color={selectedView === 'stats' ? theme.primary : colors.black} />
        </div>
        <div className={`${selectedView === 'map' ? 'selected' : ''}`} onClick={() => handleClick('map')}>
          <Map size={32} color={selectedView === 'map' ? theme.primary : colors.black} />
        </div>
        <div className={`${selectedView === 'informations' ? 'selected' : ''}`} onClick={() => handleClick('informations')}>
          <FileText size={32} color={selectedView === 'informations' ? theme.primary : colors.black} />
        </div>
      </div>

      <style jsx>{`
        .view-selector {
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          box-shadow: 0 -1px 4px ${colors.lightGrey};
        }

        .view-selector > div {
          padding: 0.5em;
          margin: auto;
          margin-bottom: -4px;
        }

        .view-selector > div.selected {
          border-top: 4px solid ${theme.primary};
        }
      `}</style>
    </>
  )
}

const DesktopMasks = () => {
  return (
    <>
      <div className='menu'>
        <Scrollable>
          <>
            <MasksStatistics />
            <MasksInformations />
          </>
        </Scrollable>
      </div>

      <div className='map'>
        <MasksMap />
      </div>

      <style jsx>{`
        .menu {
          z-index: 1;
          display: flex;
          flex-direction: column;
          max-width: ${theme.menuWidth};
          box-shadow: 0 1px 4px ${colors.lightGrey};
        }

        .map {
          display: flex;
          flex: 1;
          flex-direction: column;
          height: 100%;
        }
      `}</style>
    </>
  )
}

const Masks = props => {
  const {isMobileDevice} = useContext(AppContext)

  const [selectedCommune, setSelectedCommune] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const Component = isMobileDevice ? MobileMasks : DesktopMasks

  return (
    <MasksContext.Provider value={{
      masksCommunes,
      selectedCommune,
      setSelectedCommune,
      selectedRegion,
      setSelectedRegion
    }}
    >
      <Component {...props} />
    </MasksContext.Provider>
  )
}

export default Masks
