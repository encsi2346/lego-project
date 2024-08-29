export enum SelectedPage {
    Home = "home",
    Creations = "creations",
    NPU = "npu",
    ContactUs = "contactus",
}

export interface CreationType {
    _id: string;
    owner: string;
    title: string;
    images: string[];
    description: string;
    rating: number;
    legoFamily: string;
}