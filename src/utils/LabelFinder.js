import  { Component } from 'react';
export default class LabelFinder extends Component {

    debugger
    static findLabels  = function (label1, label2) {

        if (paintings.indexOf(label1) != -1 && authors.indexOf(label2) != -1) {
            return {
                "title": label1,
                "author": label2
            }
        }
        if (paintings.indexOf(label2) != -1 && authors.indexOf(label1) != -1) {
            return {
                "title": label2,
                "author": label1
            }
        }
    }
}
const paintings = ["Self-portrait",
    "starrynight",
    "Metamorphosis of Narcissus",
    "Sleep",
    "Swans Reflecting Elephants",
    "The Persistence of Memory",
    "The Temptation of Saint Anthony",
    "The Son of Man",
    "Pope Leo X ",
    "The School of Athens",
    "Massacre of the Innocents",
    "Pyramid of skulls",
    "The Card Players",
    "Persian Sibyl ",
    "Guernica",
    "Weeping Woman",
    "Three musicians",
    "The Creation of Adam",
    "The last judgment",
    "Royal Red and Blue",
    "Gioconda",
    "Lady with an Ermine",
    "Salvator Mundi",
    "Self-portrait in red chalk",
    "Girl with a Pearl Earring",
    "The Kitchen Maid Milkmaid",
    "A Young Woman Seated with a Dog and a Watering Can in a Garden",
    "The Bathers",
    "The Reader",
    "The Stolen Kiss",
    "Golden Tears",
    "The Kiss",
    "The Lady in Gold(Portrait of Adele Bloch-Bauer I)",
    "Water Serpents",
    "Fauvism and Goldfish",
    "The Cat With Red Fish",
    "The Dance",
    "American Gothic",
    "A Sunday Afternoon on the Island of La Grande Jatte",
    "Las Meninas",
    "The Flower Carrier",
    "houses of parliament ",
    "Impression Sunrise",
    "Sunflowers ",
    "The Woman with a Parasol",
    "Fishing Boats In A Harbor"];

const authors = ["Vincent Van Gogh",
    "Salvador Dali",
    "Rene Magritte",
    "Rembrant Harmenszoon van Rijn",
    "Raphael",
    "Peter Paul Rubens",
    "Paul Cezanne",
    "Pablo Picasso",
    "Michelangelo Buonarroti",
    "Mark Rothko",
    "Leonardo da Vinci",
    "Johannes Vermeer",
    "Jean-Honoré Fragonard",
    "James Abbott McNei",
    "Henri Matisse",
    "Gustav Klimt",
    "Grant Wood",
    "Georges Seurat",
    "Edvard Munch",
    "Diego Velazquez",
    "Diego Rivera",
    "Claude Monet",
    "Allaert van Everdingen"];

