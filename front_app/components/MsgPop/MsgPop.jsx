import React from 'react'

// CSS
import './MsgPop.scss'

/* eslint-disable */
// props
// level, id,
class MsgPop extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  /**
   * * func getTagsByUser
   *  @param id: id of the dom elem
   *  @param timer: time in ms or false to force manual disable
  **/
  static showPopup ({ id, timer = 4000 }) {
    console.log('CALL showPopup')
    let popElem = document.getElementById(`${id}`)
    /* eslint-disable-next-line */
    if (popElem == undefined /* && null */) {
      popElem = document.getElementById(`${id} visible`)
    }
    const popElemClass = popElem.className

    if (popElemClass.indexOf('visible') === -1) {
      popElem.className = `${popElemClass} visible`
    }
    if (timer !== false) {
      setTimeout(() => { popElem.className = `${popElemClass}` }, 4000)
    }
    // console.log('popElem:', popElem)
  }

  handleCloseClick ({id = null}) {
    console.log('CALL handleCloseClick', id)
    let popElem = document.getElementById(`${id}`)
    /* eslint-disable-next-line */
    if (popElem == undefined /* && null */) {
      popElem = document.getElementById(`${id} visible`)
    }
    console.log('popElem: ', popElem)
    popElem.className = popElem.className.replace('visible', '')
  }

  render () {
    let classes = `notification is-${this.props.level}`
    classes += this.state.visible ? 'visible' : ''
    return (
      <div className={classes}
        id={this.props.id}
      >
        <button className="delete"
          onClick={() => this.handleCloseClick({id: this.props.id})}
        ></button>
        {`${this.props.message}`}
      </div>
    )
  }

  getIcon () {
    switch (this.props.level) {
      case 'warning': return 'http://svgshare.com/i/19x.svg'
      case 'danger': return 'http://svgshare.com/i/19E.svg'
      case 'success': return 'http://svgshare.com/i/19y.svg'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }
}

export default MsgPop
