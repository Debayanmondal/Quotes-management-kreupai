import QuoteService from "../services/quoteService.js";
import { handleError } from "../utils/errorHandler.js";

export const createQuote = async (req, res) => {
  try {
    const quoteData = req.body;
    const quote = await QuoteService.createQuote(quoteData);
    res
      .status(201)
      .json({ message: "Quote created successfully", quote_id: quote._id });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await QuoteService.getAllQuotes(req.query);
    res.json(quotes);
  } catch (error) {
    handleError(res, error);
  }
};

export const getQuoteById = async (req, res) => {
  try {
    const quote = await QuoteService.getQuoteById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateQuote = async (req, res) => {
  try {
    const quote = await QuoteService.updateQuote(req.params.id, req.body);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json({ message: "Quote updated successfully", quote_id: quote._id });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const success = await QuoteService.deleteQuote(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
