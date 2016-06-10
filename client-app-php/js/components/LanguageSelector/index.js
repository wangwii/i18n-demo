import style from './style.css';
import React, { Component } from 'react';
import Translater from '../../helper/translater'

@Translater
class LanguageSelector extends Component {
  render(){
    const { lang, setLang, t } = this.props;
    return (
      <ul className={style.main}>
        {
          lang.available_langs.map(info =>{
              const isActive = lang.target == info.id;
              const classes = isActive ? [style.active] : [];
              const opts = isActive ? {} : {onClick: () => setLang(info.id)};

              return (
                <li key={info.id} className={classes}>
                  <a href="javascript:void(0)" title={t(info.country)} {...opts}>
                    { t(info.language) }
                  </a>
                </li>
              )
            }
          )
        }
      </ul>
    )
  }
}

export default LanguageSelector