import React, { Component } from "react"
import CategoryView from "./category-view"
import Grid from "@material-ui/core/Grid"
import { getCoursesFromFile } from "../../../utils/courseName"
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import superagent from 'superagent';

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesItems: {},
    }
    this.imprimirAlgo = this.imprimirAlgo.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(props) {
    if (this.props !== props) {
      this.fetchData()
    }
  }

  fetchData = () => {
    this.setState({
      categoriesItems : getCoursesFromFile()
    })
  }

  handleNewCategory = () => {
    const newCategory = "New Category"
    superagent
        .post('http://localhost:9000/login/login/saveCategory')
        .set('Content-Type','application/json')
        .send({name:newCategory})
        .end((error,response) => {
          console.log(response)
          console.log(error)
    })

    this.setState({
      categoriesItems : getCoursesFromFile()
    })
  }

  updateCategoriesList = (newCategories) => {
    console.log("ESTO ES EN CONTAINER", newCategories);
    let jsonData = getCoursesFromFile();
    let categoriesJson = JSON.parse(jsonData);
    //categoriesJson.push
    
    this.setState({
      //categoriesItems : setCoursesFromFile(newCategories)
    })
  }

  imprimirAlgo(){
    console.log("holus")
  }

  render() {
    //Chequeo que el json de categorias no sea vacio.
    if (!(Object.entries(this.state.categoriesItems).length === 0 && this.state.categoriesItems.constructor === Object)) {
      return (
        <div className="order-container">
          <p>Displaying all available categories</p>
          <Grid container spacing={3}>
            <CategoryView name={this.state.categoriesItems} updateCategoriesList={this.imprimirAlgo}/>
          </Grid>
          <Button className="button default" variant="contained" size="small" color="default" onClick={this.handleNewCategory}>
            <AddIcon/> New Category
          </Button>
        </div>
      )
    } else {
      return (
        <div className="order-container">
          <p>No categories yet! Try adding a new one</p>
          <Button className="button default" variant="contained" size="small" color="default" onClick={this.handleNewCategory}>
              <AddIcon/> New Category
          </Button>
        </div>
      )
    }
  }
}
