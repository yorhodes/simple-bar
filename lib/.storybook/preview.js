import * as Themes from '../styles/themes'
import * as Settings from '../settings'
import * as Utils from '../utils'
import * as Spaces from '../components/spaces/spaces.jsx'
import * as Process from '../components/spaces/process.jsx'
import * as Variables from '../styles/core/variables'
import * as Base from '../styles/core/base'

var themeItems = []

for (var theme in Themes.collection) {
  themeItems.push({ value: theme, title: Themes.collection[theme].name })
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'NightShiftDark',
    toolbar: {
      icon: 'mirror',
      // Array of plain string values or MenuItem shape (see below)
      items: themeItems,
      // Property that specifies if the name of the item will be displayed
      showName: true
    }
  }
}

export const parameters = {
  backgrounds: {
    grid: {
      disable: true
    }
  }
}

export const decorators = [
  (Story, context) => {
    const theme = Themes.collection[context.globals.theme]
    var settings = Settings.get()

    if (settings.global.theme != theme.kind || settings.themes[`${theme.kind}Theme`] != context.globals.theme) {
      settings.global.theme = theme.kind
      settings.themes[`${theme.kind}Theme`] = context.globals.theme

      Settings.set(settings).then(() => {
        console.log("Press Cmd-R to see new theme\n\nIdk why I can't get it to reload in place")
        Utils.injectStyles('simple-bar-spaces-styles', [
          Variables.styles,
          Base.styles,
          Spaces.styles,
          Process.styles,
          Settings.styles
        ])
      })
    }

    Utils.injectStyles('simple-bar-spaces-styles', [
      Variables.styles,
      Base.styles,
      Spaces.styles,
      Process.styles,
      Settings.styles
    ])

    return (
      <div className="simple-bar simple-bar--spaces" data-theme={theme.name}>
        <Story {...context} />
      </div>
    )
  }
]
