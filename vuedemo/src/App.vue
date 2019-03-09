<template>
  <div id="app">
    <table class="table table-bordered" style="width: 900px">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listData">
          <th scope="row">{{item}}</th>
          <td>Mark{{item}}</td>
          <td>Otto{{item}}</td>
          <td>@mdo{{item}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import createColResizable from './lib'

export default {
  data() {
    return {
      listData: [1,2,3,4]
    }
  },

  mounted(){
    const domElemTable = document.querySelector('.table')
    createColResizable(domElemTable, {
      liveDrag: true
    });
  }
}
</script>

<style>
</style>
