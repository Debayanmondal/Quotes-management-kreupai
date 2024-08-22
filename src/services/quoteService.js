import Quote from "../models/Quote.js";
import Product from "../models/Product.js";
import Account from "../models/Account.js";
import Contact from "../models/Contact.js";

const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => {
    return total + product.total_price;
  }, 0);
};

const createQuote = async (quoteData) => {
  const products = await Promise.all(
    quoteData.products.map(async (product) => {
      const productDetails = await Product.findById(product.product_id);
      const total_price = product.quantity * productDetails.unit_price;
      return {
        ...product,
        product_name: productDetails.product_name,
        unit_price: productDetails.unit_price,
        total_price,
      };
    })
  );

  const total_price = calculateTotalPrice(products);
  const final_price = total_price - quoteData.discount;

  const newQuote = new Quote({
    ...quoteData,
    products,
    total_price,
    final_price,
  });

  return newQuote.save();
};

const getAllQuotes = async (filters) => {
  return Quote.find(filters).populate(
    "associated_account.account_id associated_contact.contact_id"
  );
};

const getQuoteById = async (id) => {
  return Quote.findById(id).populate(
    "associated_account.account_id associated_contact.contact_id"
  );
};

const updateQuote = async (id, quoteData) => {
  const quote = await Quote.findById(id);
  if (!quote) {
    return null;
  }

  const products = await Promise.all(
    quoteData.products.map(async (product) => {
      const productDetails = await Product.findById(product.product_id);
      const total_price = product.quantity * productDetails.unit_price;
      return {
        ...product,
        product_name: productDetails.product_name,
        unit_price: productDetails.unit_price,
        total_price,
      };
    })
  );

  const total_price = calculateTotalPrice(products);
  const final_price = total_price - quoteData.discount;

  quote.set({
    ...quoteData,
    products,
    total_price,
    final_price,
    updated_at: Date.now(),
  });

  return quote.save();
};

const deleteQuote = async (id) => {
  const quote = await Quote.findByIdAndDelete(id);
  return !!quote;
};

export default {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};
