import './App.css';
import * as React from 'react';
import { useState } from "react";
import shoeData from "./shoe-data.json";
import Shoe from "./components/shoe";
import Button from '@mui/material/Button';
import Selector from "./components/Selector";



function App() {

  const dict = {}

  shoeData.map((item) => (dict[item.name] = 0));

  const original = [...shoeData];

  const [cart, setCart] = useState(dict);
  const [page, setPage] = useState(shoeData);
  const [sorted, setSorted] = useState(false);
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  const [isReset, setIsReset] = useState(true);


  const [colorfulSorted, setColorfulSorted] = useState(false);
  const [bandwSorted, setBandwSorted] = useState(false);
  const [hightopSorted, setHightopSorted] = useState(false);
  const [lowtopSorted, setLowtopSorted] = useState(false);
  const [vansSorted, setVansSorted] = useState(false);
  const [converseSorted, setConverseSorted] = useState(false);

  const increment = (name) => {
    cart[name] = cart[name] + 1;
    setCart({ ...cart });
    setCartIsEmpty(false);
  }

  const decrement = (name) => {
    if (cart[name] > 0) {
      cart[name] = cart[name] - 1;
    }
    setCart({ ...cart });
    // eslint-disable-next-line
    if (sum() == 0) {
      setCartIsEmpty(true);
    }
  }

  function checkPresent(item) {
    return cart[item.name] > 0;
  }

  function sum() {
    return (shoeData.reduce((acc, curr) => ((curr.price * cart[curr.name]) + acc), 0)).toFixed(2);
  }

  function clearCart() {
    shoeData.map((item) => (cart[item.name] = 0));
    setCart({ ...cart });
    setCartIsEmpty(true);
  }

  function sortByPrice() {
    if (!sorted) {
      setIsReset(false);
      setSorted(true);
      page.sort((a, b) => ((a.price) - (b.price)));
      setPage(page);
    }
  }

  function reset() {
    setColorfulSorted(false);
    setBandwSorted(false);
    setHightopSorted(false);
    setLowtopSorted(false);
    setVansSorted(false);
    setConverseSorted(false);
    setSorted(false);
    setIsReset(true);

    //restore original order
    original.sort((a, b) => ((a.order) - (b.order)));
    shoeData = [...original];
    setPage(shoeData);
  }

  // function filterByColor() {
  //   if (!colorfulSorted) {
  //     setColorfulSorted(true);
  //     setPage(page.filter((shoe) => (shoe.color === "Colorful")));
  //   }
  // }
  // function filterByBandW() {
  //   if (!bandwSorted) {
  //     setBandwSorted(true);
  //     setPage(page.filter((shoe) => (shoe.color === "Black and White")));
  //   }
  // }
  // function filterByHighTop() {
  //   if (!hightopSorted) {
  //     setHightopSorted(true);
  //     setPage(page.filter((shoe) => (shoe.style === "High Top")));
  //   }
  // }
  // function filterByLowTop() {
  //   if (!lowtopSorted) {
  //     setLowtopSorted(true);
  //     setPage(page.filter((shoe) => (shoe.style === "Low Top")));
  //   }
  // }
  // function filterByVans() {
  //   if (!vansSorted) {
  //     setVansSorted(true);
  //     setPage(page.filter((shoe) => (shoe.brand === "Vans")));
  //   }
  // }
  // function filterByConverse() {
  //   if (!converseSorted) {
  //     setConverseSorted(true);
  //     setPage(page.filter((shoe) => (shoe.brand === "Converse")));
  //   }
  // }

  function filterByBrand(brandStr, brandSorted, setBrandSorted) {
    if (!brandSorted) {
      setIsReset(false);
      setBrandSorted(true);
      setPage(page.filter((shoe) => (shoe.brand === brandStr)));
    }
  }
  function filterByColorful(colorStr, colorSorted, setColorSorted) {
    if (!colorSorted) {
      setIsReset(false);
      setColorSorted(true);
      setPage(page.filter((shoe) => (shoe.color === colorStr)));
    }
  }
  function filterByStyle(styleStr, styleSorted, setStyleSorted) {
    if (!styleSorted) {
      setIsReset(false);
      setStyleSorted(true);
      setPage(page.filter((shoe) => (shoe.style === styleStr)));
    }
  }


  // function fillSorted(sorted) {
  //   if (sorted) {
  //     return "contained";
  //   } else {
  //     return "outlined";
  //   }
  // }

  function getState(state) {
    if (state === "Vans") {
      return vansSorted;
    }
    if (state === "Converse") {
      return converseSorted;
    }
    if (state === "Colorful") {
      return colorfulSorted;
    }
    if (state === "Black and White") {
      return bandwSorted;
    }
    if (state === "High Top") {
      return hightopSorted;
    }
    if (state === "Low Top") {
      return lowtopSorted;
    }
  }
  function getStateSetter(state) {
    if (state === "Vans") {
      return setVansSorted;
    }
    if (state === "Converse") {
      return setConverseSorted;
    }
    if (state === "Colorful") {
      return setColorfulSorted;
    }
    if (state === "Black and White") {
      return setBandwSorted;
    }
    if (state === "High Top") {
      return setHightopSorted;
    }
    if (state === "Low Top") {
      return setLowtopSorted;
    }
  }


  return (
    <div className="App">

      <h1 id="title">Shoe Store!</h1>
      <div id="filter">
        <h2 id="filterLabel">Filter by:</h2>
        <Selector category="Brand" one="Vans" two="Converse" filter={filterByBrand} getState={getState} getStateSetter={getStateSetter} isReset={isReset} reset={reset} />
        <Selector category="Color" one="Colorful" two="Black and White" filter={filterByColorful} getState={getState} getStateSetter={getStateSetter} isReset={isReset} reset={reset} />
        <Selector category="Style" one="High Top" two="Low Top" filter={filterByStyle} getState={getState} getStateSetter={getStateSetter} isReset={isReset} reset={reset} />
        <Button id="sortButton" disabled={sorted} onClick={sortByPrice} variant='contained' color='success'>Sort by Price</Button>
        <Button id="resetButton" disabled={isReset} onClick={reset} variant='contained'>Clear Filters</Button>
      </div>
      <div id="shoeCards">
        {page.map((item, index) => (
          <Shoe item={item} index={index} incr={increment} decr={decrement} cartIsEmpty={cartIsEmpty} cart={cart} sorted={sorted} />
        )
        )}
      </div>

      <div id="cart">
        <h2>Cart</h2>
        {
          original.filter(checkPresent).map((item) => (
            <h4>{item.name} x {cart[item.name]}</h4>
          ))
        }
        <h3>Total: ${sum()}</h3>
        <Button id="clearCartButton" variant="contained" onClick={clearCart} color="error" disabled={cartIsEmpty}>
          Clear Cart
        </Button>
      </div>


    </div>
  );
}

export default App;



/* <div class="filterCategory">
          <h3>Brand</h3>
          <Button onClick={() => filterByBrand("Vans", vansSorted, setVansSorted)} variant={fillSorted(vansSorted)}>
            Vans
          </Button>
          <Button onClick={() => filterByBrand("Converse", converseSorted, setConverseSorted)} variant={fillSorted(converseSorted)}>
            Converse
          </Button>
        </div>
        <div class="filterCategory">
          <h3>Color </h3>
          <Button onClick={() => filterByColorful("Colorful", colorfulSorted, setColorfulSorted)} variant={fillSorted(colorfulSorted)}>
            Colorful
          </Button>
          <Button onClick={() => filterByColorful("Black and White", bandwSorted, setBandwSorted)} variant={fillSorted(bandwSorted)}>
            Black and White
          </Button>
        </div>
        <div class="filterCategory">
          <h3>Style </h3>
          <Button onClick={() => filterByStyle("High Top", hightopSorted, setHightopSorted)} variant={fillSorted(hightopSorted)}>
            High Top
          </Button>
          <Button onClick={() => filterByStyle("Low Top", lowtopSorted, setLowtopSorted)} variant={fillSorted(lowtopSorted)}>
            Low Top
          </Button>
        </div> */