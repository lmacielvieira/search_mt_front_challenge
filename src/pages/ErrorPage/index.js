import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/animations/error.json'
import './style.less'
import {SETTINGS} from '../../settings'

export default class NotFound extends React.Component {
  _pageName = 'error-page'

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className={`${this._pageName} defaultText`}>
        <Lottie
          height={300}
          width={300}
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
        />
        {SETTINGS.errors.unexpectedError}
      </div>
    )
  }
}
