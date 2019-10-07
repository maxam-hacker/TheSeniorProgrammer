import React, {Component} from 'react';


class PhosaScrollingTabsHeaders extends Component {

    render() {
        var closeIcon0 = React.createElement('div', {className: 'tablink-icon-close'});
        var closeIcon1 = React.createElement('div', {className: 'tablink-icon-close'});
        var closeIcon2 = React.createElement('div', {className: 'tablink-icon-close'});
        var closeIcon3 = React.createElement('div', {className: 'tablink-icon-close'});
        var closeIcon4 = React.createElement('div', {className: 'tablink-icon-close'});
        var closeIcon5 = React.createElement('div', {className: 'tablink-icon-close'});

        var listItem0 = React.createElement('div', {className: 'tablink'}, 'Terraphosa', closeIcon0);
        var listItem1 = React.createElement('div', {className: 'tablink'}, 'id', closeIcon1);
        var listItem2 = React.createElement('div', {className: 'tablink'}, 'Super', closeIcon2);
        var listItem3 = React.createElement('div', {className: 'tablink'}, 'Editor', closeIcon3);
        var listItem4 = React.createElement('div', {className: 'tablink'}, 'TerraTerraTerra', closeIcon4);
        var listItem5 = React.createElement('div', {className: 'tablink'}, 'TerraTerraTerra', closeIcon5);

        var tabsHeders = React.createElement('div', {className: 'tablink-container'}, 
          listItem0, listItem1, listItem2, listItem3, listItem4, listItem5);

        return tabsHeders;
    }
}

export {PhosaScrollingTabsHeaders}

/*
<div class="container">
  <div class="scroller scroller-left"><i class="glyphicon glyphicon-chevron-left"></i></div>
  <div class="scroller scroller-right"><i class="glyphicon glyphicon-chevron-right"></i></div>
  <div class="wrapper">
    <ul class="nav nav-tabs list" id="myTab">
      <li class="active"><a href="#home">Home</a></li>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#messages">Messages</a></li>
      <li><a href="#settings">Settings</a></li>
      <li><a href="#">Tab4</a></li>
      <li><a href="#">Tab5</a></li>
      <li><a href="#">Tab6</a></li>
      <li><a href="#">Tab7</a></li>
      <li><a href="#">Tab8</a></li>
      <li><a href="#">Tab9</a></li>
      <li><a href="#">Tab10</a></li>
      <li><a href="#">Tab11</a></li>
	  <li><a href="#">Tab12</a></li>
      <li><a href="#">Tab13</a></li>
      <li><a href="#">Tab14</a></li>
	  <li><a href="#">Tab15</a></li>
      <li><a href="#">Tab16</a></li>
      <li><a href="#">Tab17</a></li>
  </ul>
  </div>
</div>
*/