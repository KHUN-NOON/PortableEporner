const commonColor = {
  commonWhite: '#fff',
  commonBlack: '#000000',
  activeColor: '#DE5E69', //'#00695C',
  deactiveColor: '#DE5E6950', //'#B2DFDB',
  boxActiveColor: '#DE5E6940', //'#80CBC4',
  primary: '#FD3F3F',
  secondary: '#8C90E0',
  backdrop: "rgba(0, 0, 0, 0.3)"
}
  
const light = {
  dark: false,
  colors: {
    primary: commonColor.primary,
    secondary: commonColor.secondary,
    background: commonColor.commonWhite,
    card: 'rgb(18, 18, 18)',
    text: commonColor.commonBlack,
    // textGrey: '#444',
    textGrey: '#949A9E',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    pressableRippleColor: '#303134',
    backdrop: commonColor.backdrop
  },
  text: {
    title: {
      size: 15,
      color: commonColor.commonBlack
    }
  }
}
  
const dark = {
  dark: true,
  colors: {
    primary: commonColor.primary,
    secondary: commonColor.secondary,
    background: commonColor.commonBlack,
    card: 'rgb(18, 18, 18)',
    text: commonColor.commonWhite,
    // textGrey: '#444',
    textGrey: '#949A9E',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    pressableRippleColor: '#303134',
    backdrop: commonColor.backdrop
  },
  text: {
    title: {
      size: 15,
      color: commonColor.commonBlack
    }
  }
}
  
export default { light, dark }