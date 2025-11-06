import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/BookDetail.css';

function BookDetail() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const workResponse = await fetch(`https://openlibrary.org/works/${bookId}.json`);

                if (!workResponse.ok) {
                    throw new Error('Book not found');
                }

                const workData = await workResponse.json();

                let authorDetails = [];
                if (workData.authors && workData.authors.length > 0) {
                    const authorPromises = workData.authors.slice(0, 3).map(async (author) => {
                        try {
                            const authorResponse = await fetch(`https://openlibrary.org${author.author.key}.json`);
                            const authorData = await authorResponse.json();
                            return {
                                name: authorData.name || 'Unknown',
                                bio: authorData.bio?.value || authorData.bio || 'No biography available',
                                birthDate: authorData.birth_date || 'N/A',
                                photoId: authorData.photos?.[0]
                            };
                        } catch {
                            return { name: 'Unknown', bio: 'No information available', birthDate: 'N/A' };
                        }
                    });
                    authorDetails = await Promise.all(authorPromises);
                }

                const bookDetail = {
                    title: workData.title,
                    description: workData.description?.value || workData.description || 'No description available.',
                    coverImage: workData.covers?.[0]
                        ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
                        : 'https://via.placeholder.com/300x400?text=No+Cover',
                    subjects: workData.subjects?.slice(0, 10) || [],
                    firstPublishDate: workData.first_publish_date || 'N/A',
                    authors: authorDetails,
                    excerpts: workData.excerpts?.slice(0, 2) || [],
                    links: workData.links?.slice(0, 5) || []
                };

                setBook(bookDetail);
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    if (loading) {
        return (
            <div className="detail-container">
                <div className="loading">Loading book details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="detail-container">
                <div className="error-message">
                    <h2>Error Loading Book</h2>
                    <p>{error}</p>
                    <Link to="/" className="back-button">← Back to Dashboard</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <Link to="/" className="back-button">← Back to Dashboard</Link>

            <div className="detail-content">
                <div className="detail-header">
                    <div className="detail-cover">
                        <img src={book.coverImage} alt={book.title} />
                    </div>
                    <div className="detail-info">
                        <h1>{book.title}</h1>
                        <p className="publish-date">
                            <strong>First Published:</strong> {book.firstPublishDate}
                        </p>
                        {book.authors.length > 0 && (
                            <div className="authors-section">
                                <h3>Author(s):</h3>
                                {book.authors.map((author, idx) => (
                                    <div key={idx} className="author-detail">
                                        <h4>{author.name}</h4>
                                        {author.birthDate !== 'N/A' && (
                                            <p className="author-birth">Born: {author.birthDate}</p>
                                        )}
                                        <p className="author-bio">{author.bio.substring(0, 300)}...</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="detail-body">
                    <section className="description-section">
                        <h2>Description</h2>
                        <p className="description-text">{book.description}</p>
                    </section>

                    {book.subjects.length > 0 && (
                        <section className="subjects-section">
                            <h2>Subjects & Topics</h2>
                            <div className="subjects-list">
                                {book.subjects.map((subject, idx) => (
                                    <span key={idx} className="subject-badge">{subject}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {book.excerpts.length > 0 && (
                        <section className="excerpts-section">
                            <h2>Excerpts</h2>
                            {book.excerpts.map((excerpt, idx) => (
                                <div key={idx} className="excerpt-card">
                                    <p>{excerpt.excerpt || excerpt.text}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {book.links.length > 0 && (
                        <section className="links-section">
                            <h2>External Resources</h2>
                            <div className="links-list">
                                {book.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        {link.title || link.url}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetail;