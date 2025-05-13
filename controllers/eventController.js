import Event from '../models/eventModel.js';

export default {
    async list (req, res) {
        try {
            const events = await Event.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving events", error });
        }
    },
    async show (req, res) {
        const { id } = req.params;
        try {
            const event = await Event.getEventById(id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving event", error });
        }
    },
    
    async create (req, res) {
        const { name, description, date, location, image_url } = req.body;
        try {
            const newEvent = await Event.createEvent({ name, description, date, location, image_url });
            res.status(201).json(newEvent);
        } catch (error) {
            res.status(500).json({
                message: "Error creating event",
                error: error.message,
                detail: error.detail
            });
        }
    },

    async update (req, res) {
        const { id } = req.params;
        const { name, description, date, location, image_url } = req.body;
        try {
            const updatedEvent = await Event.updateEvent(id, { name, description, date, location, image_url });
            if (!updatedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(500).json({ message: "Error updating event", error });
        }
    },

    async delete (req, res) {
        const { id } = req.params;
        try {
            const deletedEvent = await Event.deleteEvent(id);
            if (!deletedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting event", error });
        }
    }
}