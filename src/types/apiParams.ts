export interface ISearchParams {
    query?: string,
    per_page?: number,
    page?: number,
    thumbsize?: 'small' | 'medium' | 'big',
    order?: 'latest' | 'longest' | 'shortest' | 'top-rated' | 'most-popular' | 'top-weekly' | 'top-monthly',
    gay?: 0 | 1 | 2,
    lq?: 0 | 1 | 2,
    format?: 'json' | 'xml'
}

export interface IGetParams {
    id: string,
    thumbsize: ISearchParams['thumbsize'],
    format: ISearchParams['format']
}