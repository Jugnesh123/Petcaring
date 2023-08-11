export interface country {
    id: string,
    name?: string
}
export interface state {
    id: string,
    name?: string,
    country?: country,
}
export interface address{
    id: string,
    housenumber?: string,
    landmark?: string,
    area?:string,
    pincode?:string,
    district?: string,
    state?: state,
}
export interface petowner {
    id: string,
    firstname?: string,
    middlename?: string,
    lastname?: string,
    address?: address[],
    email?: string,
    phone?: string,
    image?: string[]
}

export interface species {
    id: string,
    name?: string,
    profile?: string,
}

export interface breed {
    id: string,
    name?: string,
    porfile?: string,
    species?: species,
}

export interface pet {
    id: string,
    name?: string,
    breed?: breed,
    description?: string,
    petowner?: petowner,
    image?: string[]
    profile?: string,
}

export interface petorganization {
    id: string,
    bussinessname?: string,
    address?: address,
    description?: string,
    breed?: breed[],
    profile?: string,
    email?: string,
    phone?: string,
    image?: string[]
}

export interface service{
    id: string,
    name?: string
}

export interface petorganization_breed{
    id: string,
    breed?: breed,
    price?: number,
    profile?: string,
    petorganization?: petorganization,
    description?: string,
    perday?: true|false,
    service?: service,
}

export interface transaction{
    id: string,
    pet?: pet,
    petorganization?: petorganization,
    startdate?: number
    enddate?: number,
    status?: number,
    service?: petorganization_breed[],
    price?: number,
}