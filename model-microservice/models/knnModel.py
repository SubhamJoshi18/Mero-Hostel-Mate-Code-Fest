import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from collections import Counter

class CustomKNN:
    def __init__(self, k=3, feature_weights=None):
        self.k = k
        self.feature_weights = feature_weights
        self.scaler = StandardScaler()
        self.encoder = OneHotEncoder()
        self.data = None
        self.labels = None
        self.is_fitted = False

    def fit(self, X, y, categorical_indices=None, numerical_indices=None):
        """
        Fit the kNN model with data.
        """
        self.categorical_indices = categorical_indices
        self.numerical_indices = numerical_indices

        # Separate categorical and numerical data
        if numerical_indices:
            self.numerical_data = self.scaler.fit_transform(X[:, numerical_indices])
        else:
            self.numerical_data = None

        if categorical_indices:
            self.categorical_data = self.encoder.fit_transform(X[:, categorical_indices]).toarray()
        else:
            self.categorical_data = None

        # Combine preprocessed data
        if self.numerical_data is not None and self.categorical_data is not None:
            self.data = np.hstack((self.numerical_data, self.categorical_data))
        elif self.numerical_data is not None:
            self.data = self.numerical_data
        else:
            self.data = self.categorical_data

        self.labels = np.array(y)
        self.is_fitted = True

    def _calculate_distance(self, query, data_point):
        """
        Calculate distance between a query and a data point.
        """
        distance = 0

        # Numerical features: Weighted Euclidean distance
        if self.numerical_indices:
            numerical_distance = np.sum(
                self.feature_weights[: len(self.numerical_indices)]
                * (query[: len(self.numerical_indices)] - data_point[: len(self.numerical_indices)]) ** 2
            )
            distance += numerical_distance

        # Categorical features: Hamming distance
        if self.categorical_indices:
            cat_start_idx = len(self.numerical_indices)
            categorical_distance = np.sum(
                query[cat_start_idx:] != data_point[cat_start_idx:]
            )
            distance += categorical_distance

        return np.sqrt(distance)

    def predict(self, X_query):
        """
        Predict labels for given queries.
        """
        if not self.is_fitted:
            raise ValueError("Model is not fitted. Call fit() before predict().")

        predictions = []
        for query in X_query:
            # Preprocess query
            if self.numerical_indices:
                query_numerical = self.scaler.transform([query[self.numerical_indices]])
            else:
                query_numerical = None

            if self.categorical_indices:
                query_categorical = self.encoder.transform([query[self.categorical_indices]]).toarray()
            else:
                query_categorical = None

            # Combine processed query data
            if query_numerical is not None and query_categorical is not None:
                query_processed = np.hstack((query_numerical, query_categorical))
            elif query_numerical is not None:
                query_processed = query_numerical
            else:
                query_processed = query_categorical

            # Compute distances
            distances = [self._calculate_distance(query_processed[0], dp) for dp in self.data]
            nearest_indices = np.argsort(distances)[: self.k]
            nearest_labels = self.labels[nearest_indices]

            # Majority voting
            most_common = Counter(nearest_labels).most_common(1)[0][0]
            predictions.append(most_common)

        return predictions

# Example Usage

# Dataset: Location (categorical), Money (numerical), Faculty (categorical), Gender (categorical)
data = np.array([
    ["New York", 5000, "Engineering", "Male"],
    ["Los Angeles", 3000, "Science", "Female"],
    ["Chicago", 7000, "Engineering", "Non-Binary"],
    ["Houston", 2000, "Arts", "Male"],
    ["New York", 4500, "Science", "Female"]
])
labels = np.array(["Engineering", "Science", "Engineering", "Arts", "Science"])

# Define indices
categorical_indices = [0, 2, 3]  # Location, Faculty, Gender
numerical_indices = [1]          # Money

# Fit the model
knn = CustomKNN(k=3, feature_weights=[1, 2])  # Assigning weights to features
knn.fit(data, labels, categorical_indices=categorical_indices, numerical_indices=numerical_indices)

# Query for prediction
query = np.array([
    ["Los Angeles", 4000, "Science", "Male"],  # Example query 1
    ["Chicago", 6000, "Engineering", "Female"] # Example query 2
])
predictions = knn.predict(query)

print("Predictions:", predictions)
