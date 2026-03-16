import express, { Request, Response } from 'express';
import process from 'process';

import { featureToggle } from './middleware/featureToggle';

import { recommendedProducts } from './dummyData';

import {DEAL_OF_THE_DAY_DISCOUNT} from "./consts";

const app = express();
const port = process.env.PORT;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get("/get-product-recommendations", (_: Request, res: Response) => {
  const randomNumber = Math.random();

  if (randomNumber > 0.5) {
    const shuffledProducts = recommendedProducts
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const randomProducts = shuffledProducts.slice(0, 5);
    return res.json(randomProducts);
  }

  return res.status(500).send('Internal Server Error');
});

app.get("/get-products-by-category", (req: Request, res: Response) => {
  const products = recommendedProducts.filter((product) => {
    if (product.productType == req.query.productType) return product;
  })

  return res.json(products);
});

// Task 3:
// Example of feature toggle. I will provide an example implementation in the next commit.
app.get("/unfinished-feature", featureToggle("unfinished-feature"), (_: Request, res: Response) => {
  // Oh no, this feature is not ready for production!
  return res.status(500).send('Internal Server Error');
});

// Deal of the Day - picks a random product and applies a 20% discount.
// It just returns a JSON object which we could display but it is probably out of scope...
app.get("/deal-of-the-day", featureToggle("deal-of-the-day"), (_: Request, res: Response) => {
  const randomIndex = Math.floor(Math.random() * recommendedProducts.length);
  const product = recommendedProducts[randomIndex];

  return res.json({
    title: product.title,
    image: product.imageUrl,
    originalPrice: product.getPrice(),
    dealPrice: product.getPrice() * (1 - DEAL_OF_THE_DAY_DISCOUNT),
    productType: product.productType,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
