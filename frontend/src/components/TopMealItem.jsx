import PropTypes from "prop-types";

// Single Item Component
const TopMealItem = ({ item }) => {
    // Styles for consistent shape
    const styles = {
        container: {
            textAlign: "center",
            padding: "10px",
            height: "300px", // Uniform height for all items
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        image: {
            width: "100%",
            height: "200px", // Fixed height for the image
            borderRadius: "10px",
            objectFit: "cover",
        },
        title: {
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "bold",
        },
    };

    return (
        <div style={styles.container}>
            <img src={item.img} alt={item.title} style={styles.image} />
            <h3 style={styles.title}>{item.title}</h3>
        </div>
    );
};

// Prop Validation
TopMealItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default TopMealItem;
