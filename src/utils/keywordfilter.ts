const keywordfilter = (text: string, title: string) => {
    if ( text && title ) {
        let str = text.split(',').join('')

        let without_title = str.replace(title, '') 

        return without_title.split(' ').splice(0, 3).join(' ')

        // return without_title
    } else {
        return null
    }
}

export default keywordfilter