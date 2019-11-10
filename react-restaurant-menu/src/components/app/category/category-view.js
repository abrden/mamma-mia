import React, { Component } from "react"
import CategoryItem from "./category-item"
import Grid from "@material-ui/core/Grid"
import superagent from 'superagent';

export default class CategoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesList: this.props.name
    };
    this.updateCategoriesList = this.updateCategoriesList.bind(this)
  };

  updateCategoriesList = (updatedCategory) => {
    if (updatedCategory.deleted){
      superagent
        .post('http://localhost:9000/login/login/deleteCategory')
        .set('Content-Type','application/json')
        .send({category_id:updatedCategory.categoryID})
        .end((error,response) => {
          console.log(response)
          console.log(error)
      })
    }
    else if (updatedCategory.updated){
      superagent
        .post('http://localhost:9000/login/login/saveCategory')
        .set('Content-Type','application/json')
        .send({name:updatedCategory.html, category_id:updatedCategory.categoryID})
        .end((error,response) => {
          var catId = response.body.category_id
          console.log(response)
          console.log(error)
      })
    }
    else{

    }
 /*  var newCategories = [...this.props.name]

    if (updatedCategory.deleted) 
      newCategories.splice(updatedCategory.categoryID,1)
    else if (newCategories.length-1 < updatedCategory.categoryID)
      newCategories.push(updatedCategory.html);
    else
      alert(updatedCategory);
      newCategories[updatedCategory.categoryID] = updatedCategory.html

    console.log("categories after anything: " + newCategories) // Array of categories is updated up to this point
    this.setState({ categoriesList: newCategories });         // However, state is never updated here (TODO: CHECK THIS)
    console.log("VIEW", this.state)
    console.log("NEW CATEGORIES", newCategories)
    this.setState(newCategories);
    this.state = newCategories
    console.log("STATE DESPUES DE SETEAR ESTADO NUEVO", this.state)
*/
  }

  render() {
    return Object.keys(this.props.name).map((res,index) => (
      <Grid item xs={4} key={res}>
        <CategoryItem id={res} categoryTitle={this.props.name[res]} className="order-item" updateCategoriesList={this.updateCategoriesList}/>
      </Grid>
    ))
  }
}
