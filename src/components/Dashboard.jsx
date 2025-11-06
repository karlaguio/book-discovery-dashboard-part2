import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Dashboard.css';

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('all');
    const [stats, setStats] = useState({
        totalBooks: 0,
        avgEditions: 0,
        oldestYear: 0,
        newestYear: 0,
        booksWithAuthors: 0,
        totalAuthors: 0
    });

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                'https://openlibrary.org/subjects/programming.json?limit=50'
            );
            const data = await response.json();

            const booksData = data.works.map(book => ({
                key: book.key,
                id: book.key.split('/').pop(),
                title: book.title,
                authors: book.authors?.map(a => a.name) || ['Unknown Author'],
                firstPublishYear: book.first_publish_year || 'N/A',
                coverImage: book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : 'https://via.placeholder.com/150x200?text=No+Cover',
                subjects: book.subject?.slice(0, 5) || [],
                editionCount: book.edition_count || 0
            }));

            setBooks(booksData);
            setFilteredBooks(booksData);
            calculateStats(booksData);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (booksData) => {
        const validYears = booksData
            .map(b => b.firstPublishYear)
            .filter(year => year !== 'N/A' && year > 0);

        const booksWithAuthors = booksData.filter(
            b => b.authors && b.authors.length > 0 && b.authors[0] !== 'Unknown Author'
        ).length;

        const totalAuthors = booksData.reduce(
            (sum, book) => sum + (book.authors?.length || 0), 0
        );

        const avgEditions = booksData.reduce(
            (sum, book) => sum + book.editionCount, 0
        ) / booksData.length;

        setStats({
            totalBooks: booksData.length,
            avgEditions: Math.round(avgEditions),
            oldestYear: validYears.length > 0 ? Math.min(...validYears) : 0,
            newestYear: validYears.length > 0 ? Math.max(...validYears) : 0,
            booksWithAuthors,
            totalAuthors
        });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        filterBooks(query, yearFilter);
    };

    const handleYearFilter = (filter) => {
        setYearFilter(filter);
        filterBooks(searchQuery, filter);
    };

    const filterBooks = (search, year) => {
        let filtered = [...books];

        if (search) {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.authors.some(author =>
                    author.toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        if (year !== 'all') {
            const currentYear = new Date().getFullYear();
            filtered = filtered.filter(book => {
                if (book.firstPublishYear === 'N/A') return false;

                switch (year) {
                    case 'recent':
                        return book.firstPublishYear >= currentYear - 10;
                    case 'classic':
                        return book.firstPublishYear < currentYear - 30;
                    case '2000s':
                        return book.firstPublishYear >= 2000 && book.firstPublishYear < 2010;
                    case '2010s':
                        return book.firstPublishYear >= 2010 && book.firstPublishYear < 2020;
                    case '2020s':
                        return book.firstPublishYear >= 2020;
                    default:
                        return true;
                }
            });
        }

        setFilteredBooks(filtered);
    };

    const getDecadeDistribution = () => {
        const decades = {};
        books.forEach(book => {
            if (book.firstPublishYear !== 'N/A') {
                const decade = Math.floor(book.firstPublishYear / 10) * 10;
                decades[decade] = (decades[decade] || 0) + 1;
            }
        });
        return Object.entries(decades)
            .map(([decade, count]) => ({ decade: `${decade}s`, count }))
            .sort((a, b) => parseInt(a.decade) - parseInt(b.decade));
    };

    const getEditionRanges = () => {
        const ranges = {
            '1-10': 0,
            '11-50': 0,
            '51-100': 0,
            '100+': 0
        };
        books.forEach(book => {
            if (book.editionCount <= 10) ranges['1-10']++;
            else if (book.editionCount <= 50) ranges['11-50']++;
            else if (book.editionCount <= 100) ranges['51-100']++;
            else ranges['100+']++;
        });
        return Object.entries(ranges).map(([range, value]) => ({ range, value }));
    };

    const COLORS = ['#6f4e37', '#8b7355', '#a0826d', '#c9b896'];

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading">Loading books...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Open Library Book Dashboard</h1>
                <p>Explore programming books from the Open Library collection</p>
            </header>

            <section className="stats-section">
                <h2>Summary Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>{stats.totalBooks}</h3>
                        <p>Total Books</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.avgEditions}</h3>
                        <p>Avg Editions per Book</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.oldestYear}</h3>
                        <p>Oldest Publication Year</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.newestYear}</h3>
                        <p>Newest Publication Year</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.booksWithAuthors}</h3>
                        <p>Books with Known Authors</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.totalAuthors}</h3>
                        <p>Total Author Credits</p>
                    </div>
                </div>
            </section>

            <section className="charts-section">
                <h2>Data Visualizations</h2>
                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Books by Decade</h3>
                        <p className="chart-description">Distribution of books across different time periods</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={getDecadeDistribution()}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#d4c5b0" />
                                <XAxis dataKey="decade" stroke="#3d2b1f" />
                                <YAxis stroke="#3d2b1f" />
                                <Tooltip
                                    contentStyle={{ background: '#f5e6d3', border: '2px solid #8b7355' }}
                                />
                                <Bar dataKey="count" fill="#6f4e37" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h3>Edition Count Distribution</h3>
                        <p className="chart-description">How many editions exist for books in our collection</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={getEditionRanges()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {getEditionRanges().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#f5e6d3', border: '2px solid #8b7355' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            <section className="controls-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-container">
                    <label htmlFor="year-filter">Filter by Era:</label>
                    <select
                        id="year-filter"
                        value={yearFilter}
                        onChange={(e) => handleYearFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Years</option>
                        <option value="recent">Recent (Last 10 years)</option>
                        <option value="2020s">2020s</option>
                        <option value="2010s">2010s</option>
                        <option value="2000s">2000s</option>
                        <option value="classic">Classic (30+ years)</option>
                    </select>
                </div>

                <div className="results-count">
                    Showing {filteredBooks.length} of {books.length} books
                </div>
            </section>

            <section className="books-section">
                <h2>Book Collection</h2>
                {filteredBooks.length === 0 ? (
                    <div className="no-results">
                        No books match your search criteria. Try adjusting your filters.
                    </div>
                ) : (
                    <div className="books-list">
                        {filteredBooks.map((book) => (
                            <Link
                                to={`/book/${book.id}`}
                                key={book.key}
                                className="book-card-link"
                            >
                                <div className="book-card">
                                    <div className="book-cover">
                                        <img src={book.coverImage} alt={book.title} />
                                    </div>
                                    <div className="book-info">
                                        <h3 className="book-title">{book.title}</h3>
                                        <p className="book-authors">
                                            <strong>Author(s):</strong> {book.authors.join(', ')}
                                        </p>
                                        <p className="book-year">
                                            <strong>First Published:</strong> {book.firstPublishYear}
                                        </p>
                                        <p className="book-editions">
                                            <strong>Editions:</strong> {book.editionCount}
                                        </p>
                                        <div className="click-hint">Click for more details →</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Dashboard;