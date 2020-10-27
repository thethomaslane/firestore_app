import Head from 'next/head'
import styles from '../styles/Home.module.css'
import multiClass from '../utilities/multiClass.js'
import { useRouter } from 'next/router'



export class Background extends React.Component {
  render() {
    return (
    <div className={multiClass([styles.background])}> 
      <div className={multiClass(["overlay"])}>{this.props.children}
      <style jsx>{`
        .overlay {
          background-color: ${this.props.overlay};
          min-height: 100vh;
          min-width: 100vw;
        }
      `}</style>
      </div>
    </div>
    )
  }
}



export class Title extends React.Component {
  render() {
    return (
      <h1 className={multiClass([styles.titleComp, styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}> {this.props.text} </h1>
    )
  }
}



export class SubTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.blackText, styles.centered, styles.subTitleComp, styles.noMarginTopBottom])}> {this.props.text} </h2>
    )
  }
}


export class Header extends React.Component {  
  render() {
    return (
      <div className={styles.header}>
      {this.props.children}
      </div>

    )
  }
}



export class MenuBox extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.menuBox, "box"])}> {this.props.children}
        <style jsx>{`
          .box {
            background-color: ${this.props.color};
          }
        `}
        </style>
      </div>
    )
  }
}



export function PrimaryButton(props) {
    const router = useRouter();
    const handleClick = (e) => {
      if (props.clickFunction){
        props.clickFunction();
      }
      if (props.next){
        router.push(props.next);
      }

    }
    return (
      <button id={props.id} className={multiClass([styles.primaryButton])} onClick={handleClick}>{props.text}</button>
    )
}



export class Input extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.paddedTopBottom])}>
        <p className={multiClass([styles.miniWhiteTextBordered, styles.noMarginTopBottom])}>{this.props.text + ":"}</p>
        <div className={multiClass([styles.centered])}>
          <input id={this.props.text} className={multiClass([styles.inputSize])} placeholder={"Enter " + this.props.text} type="text" />
        </div>
      </div>
    )
  }
}



export class MenuTitle extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered])}>
        <h2 className={multiClass([styles.whiteTextBordered, styles.centered, styles.noMarginTopBottom])}>{this.props.text}</h2>
      </div>
    )
  }
}



export class LeftTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.whiteTextBordered,styles.noMarginTopBottom, styles.textLeft])}> {this.props.text} </h2>
    )
  }
}

export class RightTitle extends React.Component {
  render() {
    return (
      <h2 className={multiClass([styles.whiteTextBordered,styles.noMarginTopBottom, styles.textRight])}> {this.props.text} </h2>
    )
  }
}



export class ListHolder extends React.Component {
  render() {
    return (
      <div className={multiClass([styles.centered])}>
        <div className={multiClass(["gridContainer", styles.listHolder, styles.centered])} >
          {this.props.children}
        </div>
      </div>
    )
  }
}


